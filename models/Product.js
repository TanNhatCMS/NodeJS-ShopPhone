const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path')
const p = path.join(rootDir.path,'../database','Products.json')
const readFileContent = (cb) =>{
    fs.readFile(p,(err,fileContent)=>{
        if(err){
            return cb([])
        }
        try{
            fileContent = JSON.parse(fileContent)
        }catch(err){
            return cb([])
        }
        cb(fileContent)
    })
}

module.exports = class Product {
    constructor(data){
        this.name = data.name;
        this.price = data.price;
        this.screen = data.screen;
        this.backCamera = data.backCamera;
        this.frontCamera = data.frontCamera;
        this.img = data.img;
        this.desc = data.desc;
        this.type = data.type;
    }
    static fetchAll(cb){
        readFileContent(cb)
    }
    save(){
        this.id = Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
        readFileContent(products=>{
            products.push(this)
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                console.log(err)
            })
        })
    }
    static fetchData(cb){
        readFileContent(cb)
    }
    static findById(id,cb){
        readFileContent(products=>{
            const product = products.find(p=>p.id === id)
            cb(product)
        })
    }
    static deleteById(id){
        readFileContent(products=>{
            const product = products.find(p=>p.id === id)
            const updatedProducts = products.filter(p=>p.id !== id)
            fs.writeFile(p,JSON.stringify(updatedProducts),(err)=>{
                if(!err){
                    console.log('Product Deleted')
                }
            })
        })

    }
    static updateProduct(id,updatedProduct){
        readFileContent(products=>{
            const productIndex = products.findIndex(p=>p.id === id)
            products[productIndex] = updatedProduct
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                if(!err){
                    console.log('Product Updated')
                }
            })
        })
    }
}


