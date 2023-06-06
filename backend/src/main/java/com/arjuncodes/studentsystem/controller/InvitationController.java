package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.model.Invitation;
import com.arjuncodes.studentsystem.service.InvitationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
@RequestMapping("/invitations")
@CrossOrigin
public class InvitationController {
    @Autowired
    private InvitationService invitationService;

    @PostMapping("/add")
    public String add(@RequestBody Invitation invitation) {
        invitationService.saveInvitation(invitation);
        return "New invite is added";
    }

    //newcontroolo
    @PostMapping("/newadd")
    public ResponseEntity<Map<String, Object>> neoadd(@RequestBody Invitation invitation) {
        Invitation savedInvitation = invitationService.saveInvitation(invitation);

        Map<String, Object> response = new HashMap<>();
        response.put("id", savedInvitation.getId());
        response.put("message", "New invite is added");

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/getAll")
    public List<Invitation> list() {
        return invitationService.getAllInvites();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/recuperoinviti/{recipientid}")
    public List<Map<String, Object>> getByRecipientid(@PathVariable int recipientid) {
        List<Invitation> invitations = invitationService.getByRecipientidAndAccepted(recipientid,false);

        List<Map<String, Object>> result = new ArrayList<>();
        for (Invitation invite : invitations) {
            Map<String, Object> inviteDetails = new HashMap<>();
            inviteDetails.put("id", invite.getId());
            inviteDetails.put("sender_id", invite.getSender_id());

            inviteDetails.put("recipientid", invite.getRecipientid());

            inviteDetails.put("game_id", String.valueOf(invite.getGame_id()));

            inviteDetails.put("accepted", invite.isAccepted());
            result.add(inviteDetails);
        }

        return result;
    }
    @PutMapping("/accept/{inviteId}")
    public ResponseEntity<Map<String, Object>> acceptInvite(@PathVariable int inviteId) {
        Optional<Invitation> invite = invitationService.getInvitationById(inviteId);
        if (invite.isPresent()) {
            Invitation acceptedInvite = invite.get();
            acceptedInvite.setAccepted(true);
            invitationService.saveInvitation(acceptedInvite);
            //invitationService.deleteInvitation(inviteId);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Invite accepted and removed from database");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Invite not found");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/decline/{inviteId}")
    public ResponseEntity<Map<String, Object>> declineInvite(@PathVariable int inviteId) {
        Optional<Invitation> invite = invitationService.getInvitationById(inviteId);
        if (invite.isPresent()) {
            invitationService.deleteInvitation(inviteId);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Invite declined and removed from database");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Invite not found");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

//solo questo uso
    @DeleteMapping("/delete/{inviteId}")
    public ResponseEntity<Map<String, Object>> deleteInvite(@PathVariable int inviteId) {
        Optional<Invitation> invite = invitationService.getInvitationById(inviteId);
        if (invite.isPresent()) {
            invitationService.deleteInvitation(inviteId);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Invite deleted successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Invite not found");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }




    //new

    @GetMapping("/checkAccepted/{inviteId}")
    public ResponseEntity<Map<String, Object>> checkAccepted(@PathVariable int inviteId) {
        Optional<Invitation> invite = invitationService.getInvitationById(inviteId);
        if (invite.isPresent()) {
            Invitation invitation = invite.get();
            Map<String, Object> response = new HashMap<>();
            if (invitation.isAccepted()) {
                response.put("message", "Invitation with ID " + inviteId + " has been accepted");
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("message", "Invitation with ID " + inviteId + " has not been accepted yet");
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Invitation not found");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
}