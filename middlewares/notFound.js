function notFound(req, res) {
    res.status(404).json({
        error: 'not Found',
        message: 'Pagine non trovata',
    })
}

module.exports = notFound