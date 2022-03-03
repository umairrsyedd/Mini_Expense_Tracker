const ObjectId = require('mongodb').ObjectId;
const defaultNeeds =
{
    macro_id: new ObjectId(),
    name: "Needs",
    color: "#",
    micro: [
        {
            micro_id: new ObjectId(),
            name: "Rent",
            emoji: "🏠",
        },
        {
            micro_id: new ObjectId(),
            name: "Bills",
            emoji: "💵",
        },
        {
            micro_id: new ObjectId(),
            name: "Loans",
            emoji: "💸",
        },
        {
            micro_id: new ObjectId(),
            name: "Emergency",
            emoji: "🚨",
        },
        {
            micro_id: new ObjectId(),
            name: "Guests",
            emoji: "👥",
        },
        {
            micro_id: new ObjectId(),
            name: "Household",
            emoji: "🏡",
        },
        {
            micro_id: new ObjectId(),
            name: "Education",
            emoji: "🎓",
        },
        {
            micro_id: new ObjectId(),
            name: "Groceries",
            emoji: "🍏",
        },
        {
            micro_id: new ObjectId(),
            name: "Insurance",
            emoji: "💼",
        },
        {
            micro_id: new ObjectId(),
            name: "Transport",
            emoji: "🚌",
        },
        {
            micro_id: new ObjectId(),
            name: "Health",
            emoji: "💊",
        },
        {
            micro_id: new ObjectId(),
            name: "Other",
            emoji: "💡",
        },
    ]

}


const defaultWants =
{
    macro_id: new ObjectId(),
    name: "Wants",
    color: "#",
    micro: [
        {
            micro_id: new ObjectId(),
            name: "Food",
            emoji: "🍔",
        },
        {
            micro_id: new ObjectId(),
            name: "Vacation",
            emoji: "🏝",
        },
        {
            micro_id: new ObjectId(),
            name: "Memberships",
            emoji: "💵",
        },
        {
            micro_id: new ObjectId(),
            name: "Gadgets",
            emoji: "📱",
        },
        {
            micro_id: new ObjectId(),
            name: "Outings",
            emoji: "🏔",
        },
        {
            micro_id: new ObjectId(),
            name: "Clothes",
            emoji: "👚",
        },
        {
            micro_id: new ObjectId(),
            name: "Entertainment",
            emoji: "🎬",
        },
        {
            micro_id: new ObjectId(),
            name: "Other",
            emoji: "💡",
        },
    ]
}


const defaultInvestments =
{
    macro_id: new ObjectId(),
    name: "Investments",
    color: "#",
    micro: [
        {
            micro_id: new ObjectId(),
            name: "Stocks",
            emoji: "📈",
        },
        {
            micro_id: new ObjectId(),
            name: "Mutual Funds",
            emoji: "💸",
        },
        {
            micro_id: new ObjectId(),
            name: "Fixed Deposits",
            emoji: "💵",
        },
        {
            micro_id: new ObjectId(),
            name: "Gold",
            emoji: "💰",
        },
        {
            micro_id: new ObjectId(),
            name: "Crypto",
            emoji: "🔐",
        },
        {
            micro_id: new ObjectId(),
            name: "Bonds",
            emoji: "💸",
        },
        {
            micro_id: new ObjectId(),
            name: "Real Estate",
            emoji: "🏡",
        },
        {
            micro_id: new ObjectId(),
            name: "Other",
            emoji: "💡",
        },
    ]
}

const defaultCategories = [
    defaultNeeds, defaultWants, defaultInvestments
]

module.exports = { defaultCategories }