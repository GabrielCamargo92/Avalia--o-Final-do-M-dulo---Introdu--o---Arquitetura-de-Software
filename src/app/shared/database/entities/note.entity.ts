import { type } from "os";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UsernameEntity } from "./username.entity";

@Entity({
  name: "notes",
})
export class NoteEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  description: string;

  @Column()
  detailing: string;

  @Column({ default: false })
  filed: boolean;

  @Column({ type: "uuid", name: "id_usuario" })
  idUser: string;

  @ManyToOne(() => UsernameEntity)
  @JoinColumn({
    name: "id",
  })
  users: UsernameEntity;

  @CreateDateColumn({
    name: "dthr_criacao",
    type: "timestamp",
  })
  CreatedAt: Date;

  @UpdateDateColumn({
    name: "at_update",
    type: "timestamp",
  })
  updatedAt: Date;
}
