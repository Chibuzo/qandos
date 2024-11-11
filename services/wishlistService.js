const { WishList, Property, User } = require('../models');

const create = async (wishlistData) => {
    const wishlist = await WishList.findOne({
        where: { ...wishlistData, status: 'active', deleted: false }
    });
    return wishlist || WishList.create(wishlistData);
}

const list = async criteria => {
    return WishList.findAll({
        where: { ...criteria, deleted: false },
        include: [
            {
                model: Property
            },
            {
                model: User
            }
        ],
        order: [['createdAt', 'desc']],
        raw: true,
        nest: true
    });
}

module.exports = {
    create,
    list
}