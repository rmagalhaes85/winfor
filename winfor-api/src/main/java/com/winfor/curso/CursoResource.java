package com.winfor.curso;

import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;

@Path("/api/cursos")
public class CursoResource {

    @GET
    @Path("/{codCurso}")
    @Produces(MediaType.APPLICATION_JSON)
    public Curso getByCodCurso(String codCurso) {
        return Curso.findByCodCurso(codCurso);
    }
}

