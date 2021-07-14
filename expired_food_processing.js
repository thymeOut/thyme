const ContainerItem = require("./server/db/models/container_item");
const { Op } = require("sequelize");

const processExpiredFood = async () => {
  const data = await ContainerItem.findAll({
    where: {
      itemStatus: "ACTIVE",
      // rank < 1000 OR rank IS NULL
      expiration: {
        [Op.lt]: Date.now()
      },
    },
  });
  data.forEach(item => {
      item.update({...item, itemStatus: 'EXPIRED'})
  })
  return data
};

processExpiredFood()

