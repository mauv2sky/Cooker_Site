import Sequelize from 'sequelize';

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        passwd: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        img: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
      },
      {
        sequelize, // static init의 매개변수와 연결되는 옵션
        timestamps: false, // 자동으로 날짜 컬럼을 추가하는 옵션
        underscored: false, // 스네이크 케이스로 바꾸는 옵션
        modelName: 'User', // 모델 이름
        tableName: 'user', // 실제 데이터베이스의 테이블 이름
        paranoid: false, // deletedAt 컬럼을 생성하는 옵션
        charset: 'utf8', // 한글 설정
        collate: 'utf8_general_ci', // 한글 설정
      }
    );
  }
  static associate(db) {}
};
