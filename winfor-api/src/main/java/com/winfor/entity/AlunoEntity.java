package com.winfor.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;

@Entity
public class AlunoEntity  extends PanacheEntity {
    public String nome;
    public int idade;
}
