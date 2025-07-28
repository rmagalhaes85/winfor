package com.winfor.curso;

import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;

@Path("/api/matrizes")
public class MatrizResource {

    @GET
    @Path("/codcurso/{codCurso}")
    @Produces(MediaType.APPLICATION_JSON)
    public MatrizCurricular getByCodCurso(String codCurso) {
        return MatrizCurricular.findByCodCurso(codCurso);
    }
}
