const { WishList, Property } = require('../models');

const create = async (wishlistData) => {
    return WishList.create(wishlistData);
}

const list = async criteria => {
    return WishList.findAll({
        where: { ...criteria, deleted: false },
        include: {
            model: Property
        },
        order: [['createdAt', 'desc']],
        raw: true,
        nest: true
    });
}

module.exports = {
    create,
    list
}