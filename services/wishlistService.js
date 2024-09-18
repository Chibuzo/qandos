const { WishList } = require('../models');

const create = async (wishlistData) => {
    return WishList.create(wishlistData);
}

module.exports = {
    create
}