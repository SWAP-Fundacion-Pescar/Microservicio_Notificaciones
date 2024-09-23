import {body, param} from 'express-validator';

const validateCreateNotification = [
    body('userId').isString().withMessage('User ID debe ser un string'),
    body('content').isObject().withMessage('Content debe ser un objecto'),
    body('message').isString().withMessage('Message debe ser un string'),
    body('type').isString().withMessage('Type debe ser un string'),
    body('hasImage').isBoolean().withMessage('Has image debe ser un boolean')
]

const validateReadNotification = [
    body('notificationId').isString().withMessage('Notification Id debe ser un string'),
]

const validateDeleteNotification = [
    param('notificationId').isString().withMessage('Notification Id debe ser un string'),
]

export {validateCreateNotification, validateReadNotification, validateDeleteNotification};