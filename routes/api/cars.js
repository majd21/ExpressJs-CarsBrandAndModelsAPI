const express = require('express');
const cars = require('../../database/cars')

const router = express.Router();

//* Get All Cars
router.get('/' , (req , res) => {
    res.json(cars);
})

//* get brands
router.get('/:brand' , (req , res) => {
    const found = cars.some(cars => cars.brand.toLowerCase() === req.params.brand.toLowerCase())

    if(found) {
        const CarBrand = cars.filter(car => car.brand.toLowerCase() === req.params.brand.toLowerCase())
        res.json(CarBrand)
    }
    else {
        res.status(400).json({ Massage: `Brand of '${req.params.brand}' not found! `})
    }
})

//* create a brand 
router.post('/' , (req , res) => {
    const newBrand = {
        brand: req.body.brand ,
        models: req.body.models
    }

    if(!newBrand.brand || !newBrand.models){
        return res.status(400).json({
            mgs: 'Please inclue a brand and at least one model'
        })
    }

    cars.push(newBrand)
    res.json(newBrand)
})

//* Update brand
router.put('/:brand' , (req , res) => {
    const found = cars.some(cars => cars.brand.toLowerCase() === req.params.brand.toLowerCase())

    if(found) {

        const updBrand = req.body;

        cars.forEach(car => {
                
                car.brand = updBrand.brand ? updBrand.brand : car.brand;
                car.models = updBrand.models ? updBrand.models : car.models
                res.json( {msg: "brand was updated"  , car })
            
        })
        

    } else {
        res.status(400).json({ Massage: `Brand of '${req.params.brand}' not found! `})
    }
})

// delete a brand
router.delete('/:brand' , (req , res) => {
    const found = cars.some(cars => cars.brand.toLowerCase() === req.params.brand.toLowerCase())

    if(found) {
        res.json({msg: `brand of ${req.params.brand} was deleted` , DeletedCar: cars.filter(car => car.brand == req.params.brand) , RemainedCars: cars.filter(car => car.brand !== req.params.brand)})
    }else {
        res.status(400).json({ Massage: `Brand of '${req.params.brand}' not found! `})
    }
})

module.exports = router;