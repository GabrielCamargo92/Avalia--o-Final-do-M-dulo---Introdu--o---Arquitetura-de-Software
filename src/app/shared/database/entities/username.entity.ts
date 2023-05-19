import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { NoteEntity } from "./note.entity";

@Entity({
  name: "users",
})
export class UsernameEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, length: 15 })
  username: string;

  @Column()
  senha: string;

  @Column({ default: false })
  logged: boolean;

  @CreateDateColumn({
    name: "dthr_criacao",
    type: "timestamp",
  })
  createdAt: Date;

  // @UpdateDateColumn({
  //   name: "updated_at",
  //   type: "timestamp",
  // })
  // updatedAt: Date;

  @OneToMany(() => NoteEntity, (note) => note.users)
  notes: NoteEntity[];
}
