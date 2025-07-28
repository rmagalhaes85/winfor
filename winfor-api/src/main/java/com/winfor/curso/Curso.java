package com.winfor.curso;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity(name = "cursos")
public class Curso extends PanacheEntity {
    @Column(name = "cod_curso")
    public String codCurso;
    public String nome;
    public String modalidade;
    @Column(name = "grau_academico")
    public String grauAcademico;
    public String turno;
    @Column(name = "grande_area")
    public String grandeArea;
    public String area;

    public static Curso findByCodCurso(String codCurso) {
        return find("codCurso", codCurso).firstResult();
    }
}
