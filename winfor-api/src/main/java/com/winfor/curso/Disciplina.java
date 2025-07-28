package com.winfor.curso;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Column;

@Entity(name = "disciplinas")
public class Disciplina extends PanacheEntity {
    public String codigo;
    public String descricao;
    @Column(name = "carga_horaria")
    public int cargaHoraria;
}
