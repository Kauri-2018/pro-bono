const express = require('express')

// const token = require('../auth/token')

const db = require('../db/profiles')

const router = express.Router()

router.use(express.json())