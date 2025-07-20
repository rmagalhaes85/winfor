package com.winfor;

import java.net.URI;

import com.winfor.entity.AlunoEntity;

import jakarta.annotation.security.RolesAllowed;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;

@Path("/api")
public class AlunoResource {

    @POST
    //@RolesAllowed("admin_winfor")
    @Path("/public/aluno")
    @Transactional
    public Response include(AlunoEntity aluno) {
        aluno.persist();
        return Response.created(URI.create("/api/public/aluno" + aluno.id)).build();
    }
}
