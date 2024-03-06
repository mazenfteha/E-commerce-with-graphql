const helloFromRest = (req, res) => {
    console.log(req.path)
    res.json({ message: 'Hello from REST API!' });
}

module.exports = {
    helloFromRest
}