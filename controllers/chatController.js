const {Op} = require('sequelize');

const models = require('../models');
const User = models.User;
const Chat = models.Chat;
const ChatUser = models.ChatUser;
const Message = models.Message;


exports.index = async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.user.id
        },
        include: [
            {
                model: Chat,
                include: [
                    {
                        model: User,
                        where: {
                            [Op.not]: {
                                id: req.user.id
                            },
                        }
                    },
                    {
                        model: Message,
                        include: [
                            {
                                model: User
                            }
                        ],
                        limit: 20,
                        order: [[
                            'id',
                            'DESC'
                        ]]
                    }
                ]
            }
        ]

    });

    return res.json(user.Chats);
}

exports.create = async (req, res) => {
    const {partnerId} = req.body;
    const t = await models.sequelize.transaction();

    try {
        const user = await User.findOne({
            where: {
                id: req.user.id
            },
            include: [
                {
                    model: Chat,
                    where: {
                        type: 'dual',
                    },
                    include: [
                        {
                            model: ChatUser,
                            where: {
                                userId: partnerId
                            }
                        }
                    ]
                }
            ]
        });

        if (user && user.Chats.length > 0) {
            return res.status(403).json({
                status: 'ERROR',
                message: 'Chat with this user already exists!'
            });
        } else {
            const chat = await Chat.create(
                {
                    type: 'dual'
                },
                {
                    transaction: t
                }
            );

            await ChatUser.bulkCreate([
                {
                    chatId: chat.id,
                    userId: req.user.id
                },
                {
                    chatId: chat.id,
                    userId: partnerId
                }
            ], {
                transaction: t
            });

            await t.commit();

            const newChat = await Chat.findOne({
                where: {
                    id: chat.id
                },
                include: [
                    {
                        model: User,
                        where: {
                            [Op.not]: {
                                id: req.user.id
                            },
                        }
                    },
                    {
                        model: Message
                    }
                ]
            });

            return res.json(newChat);
        }
    } catch (e) {
        await t.rollback();
        return res.status(500).json({
            status: "ERROR",
            message: e.message
        });
    }
};

exports.messages = async (req, res) => {
    const limit = 10;
    const page = req.query.pageBreakAfter || 1;
    const offset = page > 1 ? page * limit : 0;

    const messages = await Message.findAndCountAll({
        where: {
            chatId: req.query.id
        },
        include: [
            {
                model: User
            }
        ],
        limit,
        offset
    });

    const totalPages = Math.ceil(messages.count / limit);

    if (page > totalPages) {
        return res.json({
            data: {
                messages: []
            }
        })
    } else {
        return res.json({
            data: {
                messages: messages.rows,
                paggination: {
                    limit,
                    offset
                }
            }
        });
    }
};

exports.imageUpload = async (req, res) => {
  if (req.file) {
      return res.json({url: req.file.filename})
  }

  return res.status(500).json('No image uploaded');
};

exports.deleteChat = async (req, res) => {
    try {
        await Chat.destroy({
            where: {
                id: req.params.id
            }
        });

        return res.json({
            status: 'SUCCESS',
            message: 'Chat deleted successfully'
        });
    } catch (e) {
        return res.json({
            status: 'ERROR',
            message: e.message
        });
    }
};