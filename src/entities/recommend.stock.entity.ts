import { Column, CreateDateColumn, Entity, PrimaryColumn, Unique, UpdateDateColumn, PrimaryGeneratedColumn} from "typeorm";
import { instanceToPlain, Exclude } from "class-transformer";
import { IsNotEmpty } from "class-validator";

@Entity("recommendstock")
export class RecommendStock{
    @Exclude()
    @PrimaryGeneratedColumn()
    id:number;

    @Exclude()
    @CreateDateColumn()
    createdAt:Date;

    @Exclude()
    @UpdateDateColumn()
    updatedAt:Date;

    @Column({unique:true})
    stockCode:string;

    @Column({unique:true})
    stockName:string;

    toJSON(){
        return instanceToPlain(this);
    }
}