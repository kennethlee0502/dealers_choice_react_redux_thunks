const Sequelize = require("sequelize");
const { STRING } = Sequelize.DataTypes;
const sequelize = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_react_redux"
);

const faker = require("faker");

const User = sequelize.define("user", {
  name: {
    type: STRING,
  },
});

User.generateRandom = function () {
  let firstName = faker.name.firstName();
  let lastName = faker.name.lastName();
  let jobTitle = faker.name.jobTitle();
  let jobDescriptor = faker.name.jobDescriptor();

  return this.create({
    name: `${firstName} ${lastName} work as ${jobDescriptor} ${jobTitle}`,
  });
};

const data = async (res, req, next) => {
  try {
    await sequelize.sync({ force: true });
    await Promise.all(User.generateRandom());
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  User,
  data,
};
