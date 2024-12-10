import  'dotenv/config'

import * as joi from 'joi'

interface envsVariables{
    PORT: number
    PRODUCTS_MICROSERVICES_PORT:number,
    PRODUCTS_MICROSERVICES_HOST:string
}


const schemaVariables = joi.object({
    PORT : joi.number().required(),
    PRODUCTS_MICROSERVICES_PORT: joi.number().required(),
    PRODUCTS_MICROSERVICES_HOST: joi.string().required()
}).unknown(true)


const {value,error} = schemaVariables.validate(process.env)


if(error)
    throw new Error(`Config validation error ${error}`)


const env:envsVariables = value

export const envs = {
    port : env.PORT,
    product_microservices_host: env.PRODUCTS_MICROSERVICES_HOST,
    product_microservices_port: env.PRODUCTS_MICROSERVICES_PORT
}