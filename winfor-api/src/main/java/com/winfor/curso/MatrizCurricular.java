package com.winfor.curso;

import java.time.LocalDate;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity(name = "matrizes_curriculares")
public class MatrizCurricular extends PanacheEntity {
    @Column(name = "inicio_vigencia")
    public LocalDate inicioVigencia;
    @Column(name = "fim_vigencia")
    public LocalDate fimVigencia;

    @Column(name = "curso_id")
    public Long cursoId;

    public static MatrizCurricular findByCodCurso(String codCurso) {
        return find("curso.codCurso", codCurso).firstResult();
    }

    public static MatrizCurricular findByCursoId(Long cursoId) {
        return find("cursoId", cursoId).firstResult();
    }
}

