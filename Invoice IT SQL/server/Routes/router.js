const express = require("express");

const router = new express.Router();
const conn = require("../db/conn");

//new po

router.post("/create", (req, res) => {
    // console.log(req.body);
    const { date, order, po, name, itemid, quantity, hsn, gst, rate, grossvalue, netvalue, status, createdby, address } = req.body;
    if (!date || !order || !po || !name || !itemid || !quantity || !hsn || !gst || !rate || !grossvalue || !netvalue || !status || !createdby || !address) {
        res.status(422).json("Please fill all data");
    }
    try {
        conn.query("SELECT * FROM purchaseorders WHERE order = ?", order, (err, result) => {
            if (result){
                res.status(422).json("this po already present");

            } else {
                conn.query("INSERT INTO purchaseorders SET ?", { date, order, po, name, itemid, quantity, hsn, gst, rate, grossvalue, netvalue, status, createdby, address }, (err, result) => {
                    if (err) {
                        res.status(422).json(err)
                        console.log(err)
                    } else {
                        res.status(201).json(req.body);
                    }
                })
            }
        })

    } catch (err) {
        res.status(422).json(err);
    }
})

//get all po

router.get("/getallpo" ,(req,res)=>{
conn.query("SELECT * FROM purchaseorders", (err,result)=>{
    if(err){
        res.status(422).json(err);
    }else{
        res.status(201).json(result);
    }
} )
})

//delete

router.delete("/delete/:id" ,(req,res)=>{

    const {id} = req.params;

    conn.query("DELETE FROM purchaseorders WHERE id = ?",id, (err,result)=>{
        if(err){
            res.status(422).json(err);
        }else{
            res.status(201).json(result);
        }
    } )
    })

//get single po

router.get("/view/:id" ,(req,res)=>{

    const {id} = req.params;

    conn.query("SELECT * FROM purchaseorders WHERE id = ?",id, (err,result)=>{
        if(err){
            res.status(422).json(err);
        }else{
            res.status(201).json(result);
        }
    } )
    })

//UPDATE PO

router.patch("/update/:id" ,(req,res)=>{

    const {id} = req.params;
    const data = req.body;

    conn.query("UPDATE purchaseorders SET ? WHERE id = ?",[data, id], (err,result)=>{
        if(err){
            res.status(422).json(err);
        }else{
            res.status(201).json(result);
        }
    } )
    })

//search po
router.get("/search/:order" ,(req,res)=>{

    const {order} = req.params;


    conn.query("SELECT * FROM purchaseorders WHERE po =?",order, (err,result)=>{
        if(err){
            res.status(422).json(err);
        }else{
            res.status(201).json(result);
        }
    } )
    })



module.exports = router;