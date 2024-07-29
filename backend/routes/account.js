const express = require('express');
const authMiddleware = require('../middleware');
const { Account, User } = require('../db');
const { default: mongoose } = require('mongoose');

const accountRouter = express.Router();

accountRouter.get('/balance', authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId }).populate('userId').exec();
        
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        
        res.json({
            userId: account.userId._id,
            firstName: account.userId.firstName,
            balance: account.balance / 100,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ errmsg: "Error in getting balance" });
    }
})

// using transactions
accountRouter.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    // start transaction
    session.startTransaction();
    const { to, amount } = req.body;

    // verify sender
    const fromAccount = await Account.findOne({
        userId: req.userId
    }).session();

    // console.log(fromAccount);
    if (!fromAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Check in backend server"
        })
    }

    if (fromAccount.balance / 100 < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    // verify receiver
    const toAccount = await Account.findOne({
        userId: to,
    }).session();
    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    // perform the transaction
    try {
        // debit
        await Account.updateOne({
            userId: req.userId,
        }, {
            $inc: {
                balance: -amount * 100,
            }
        }).session(session);
        // credit
        await Account.updateOne({
            userId: to,
        }, {
            $inc: {
                balance: amount * 100,
            }
        }).session(session);

        // commit the transaction
        await session.commitTransaction();

        res.json({
            message: "Transfer successful"
        })
    } catch (error) {
        await session.abortTransaction();
        console.log(error);
        res.json({
            message: "Transfer got failed"
        })
    }
});

module.exports = accountRouter;