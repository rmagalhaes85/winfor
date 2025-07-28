package com.winfor.curso;

import java.util.List;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "matrizes_disciplinas")
public class MatrizDisciplina extends PanacheEntity {
    public int semestre;
    public String tipo;

    @Column(name = "matriz_curricular_id")
    public Long matrizCurricularId;

    @ManyToOne
    @JoinColumn(name = "disciplina_id")
    public Disciplina disciplina;

    public static List<MatrizDisciplina> findByIdMatriz(Long matrizCurricularId) {
        return list("matrizCurricularId", matrizCurricularId);
    }
}
