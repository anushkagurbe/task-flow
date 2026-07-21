export let validateMiddleware = (schema)=>{
    return async(req, res, next)=>{
        console.log("rq body", req.body)
        try
        {
            let parseData = await schema.parseAsync(req.body);
            next();
        }
        catch(error)
        {
            console.log(error);
            next(error);
        }
    }
}