package com.winfor.curso;

import java.util.List;

import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;

@Path("/api/cursos")
public class CursoResource {

    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Curso> listAll() {
        return Curso.listAll();
    }

    @GET
    @Path("/{codCurso}")
    @Produces(MediaType.APPLICATION_JSON)
    public Curso getByCodCurso(String codCurso) {
        return Curso.findByCodCurso(codCurso);
    }

}

