import { Table, Column, Model, DataType, Default, AllowNull } from 'sequelize-typescript';

@Table({
    tableName: 'book'
})
class Book extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id: number;

    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    declare title: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    declare author: string;

    @Column({
        type: DataType.STRING(13),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            len: [10, 13],
        }
    })
    declare isbn: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    })
    declare description: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 1.1
        }
    })
    declare price: number;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
        validate: {
            isDate: true
        }
    })
    declare publicationDate: Date;

    @Column({
        type: DataType.ENUM,
        allowNull: false,
        values: ['narrativo', 'lirico', 'didactico', 'dramatico']
    })
    declare genre: 'narrativo' | 'lirico' | 'didactico' | 'dramatico';


    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    declare available: boolean;
}

export default Book;