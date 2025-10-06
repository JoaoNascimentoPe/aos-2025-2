const getTarefaModel = (sequelize, { DataTypes }) => {
  const tarefa = sequelize.define("tarefa", {
    objetId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    descrica: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    concluida: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return tarefa;
};

export default getTarefaModel;
