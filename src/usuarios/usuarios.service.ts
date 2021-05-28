import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(@InjectRepository(Usuario) private repo: Repository<Usuario>) {}
  create(createUsuarioDto: CreateUsuarioDto) {
    const user = this.repo.create(createUsuarioDto);
    return this.repo.save(user);
  }

  findAll() {
    return this.repo.find({ order: { id: 'DESC' } });
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const user = await this.repo.findOne(id);
    return this.repo.save({ ...user, ...updateUsuarioDto });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  createBulk(users: any[]) {
    const data = this.repo.create(users);
    return this.repo.save(data);
  }
}
