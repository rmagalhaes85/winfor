package com.winfor.curso;

import java.util.List;
import java.util.Map;
import java.util.LinkedHashMap;

import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.toMap;

import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;

@Path("/api/matriz_disciplinas")
public class MatrizDisciplinaResource {

    @GET
    @Path("/search/{idMatriz}")
    @Produces(MediaType.APPLICATION_JSON)
    public Map<Integer, List<MatrizDisciplina>> getByIdMatriz(Long idMatriz) {
        return MatrizDisciplina.findByIdMatriz(idMatriz)
            .stream()
            .collect(groupingBy(md -> md.semestre))
            .entrySet()
            .stream()
            .sorted(Map.Entry.comparingByKey())
            .collect(toMap(Map.Entry::getKey, Map.Entry::getValue, (oldValue, newValue) -> oldValue, LinkedHashMap::new));
    }
}

