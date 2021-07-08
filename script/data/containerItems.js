const containerItems = [
  {
    userId: 1,
    containerId: 1,
    itemId: 1,
    originalQuantity: 1,
    itemStatus: 'EXPIRED'
  },
  {
    userId: 1,
    containerId: 1,
    itemId: 2,
    originalQuantity: 3,
    quantityUsed: 2,
    itemStatus: 'ACTIVE'
  },

  //eggs
  {
    userId: 2,
    containerId: 1,
    itemId: 3,
    originalQuantity: 12,
    quantityUsed: 5,
    itemStatus: 'EXPIRED'
  },
  {
    userId: 2,
    containerId: 2,
    itemId: 3,
    originalQuantity: 22,
    itemStatus: 'REMOVED'
  },
  {
    userId: 1,
    containerId: 1,
    itemId: 3,
    originalQuantity: 234,
    itemStatus: 'REMOVED'
  },
];

module.exports = containerItems;
