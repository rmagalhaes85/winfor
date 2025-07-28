package com.winfor.curso;

import java.time.LocalDate;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "matrizes_curriculares")
public class MatrizCurricular extends PanacheEntity {
    @Column(name = "inicio_vigencia")
    public LocalDate inicioVigencia;
    @Column(name = "fim_vigencia")
    public LocalDate fimVigencia;

    @ManyToOne
    @JoinColumn(name = "curso_id")
    public Curso curso;

    public static MatrizCurricular findByCodCurso(String codCurso) {
        return find("curso.codCurso", codCurso).firstResult();
    }
}

