const User = require('../models/User');
const Review = require('../models/Review');

exports.showMemberSearch = async (req, res, next) => {
    try {
        const q = req.query.q;
        let users = [];

        if (q && q.trim() !== '') {
            users = await User.searchByUsername(q.trim());
        }

        res.render('members/index', {
            title: 'Members',
            searchQuery: q || '',
            users,
        });
    } catch (err) {
        next(err);
    }
};

exports.showMemberProfile = async (req, res, next) => {
    try {
        const username = req.params.username;

        const user = await User.findByUsername(username);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        const reviews = await Review.getReviewsByUser(user.id);

        res.render('members/show', {
            title: `${user.username}'s reviews`,
            member: user,
            reviews
        });

    } catch (err) {
        next(err);
    }
};
