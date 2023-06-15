package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.model.Invitation;
import com.arjuncodes.studentsystem.model.Player;
import com.arjuncodes.studentsystem.service.InvitationService;
import com.arjuncodes.studentsystem.service.PlayerService;
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
    @Autowired
    private PlayerService playerService;
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
            inviteDetails.put("senderid", invite.getSenderid());

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
    @GetMapping("/{senderId}/recent")
    public ResponseEntity<List<String>> getRecentInvitationsBySender(@PathVariable int senderId) {
        List<Invitation> invitations = invitationService.getInvitationsBySenderId(senderId);
        if (invitations.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // ordina gli inviti in ordine decrescente in base all'id
        invitations.sort(Comparator.comparing(Invitation::getId).reversed());

        Set<String> uniqueEmails = new HashSet<>();
        List<String> recentInvitations = new ArrayList<>();
        for (int i = 0; i < Math.min(invitations.size(), 4); i++) {
            Invitation invitation = invitations.get(i);

            int recipientId = invitation.getRecipientid();
            Player recipient = playerService.getPlayerById(recipientId);

            String recipientEmail = recipient.getEmail();
            if (uniqueEmails.add(recipientEmail)) {
                recentInvitations.add(recipientEmail);
            }
        }

        return new ResponseEntity<>(recentInvitations, HttpStatus.OK);
    }
    //not good
    @PutMapping("/{senderId}/on")
    public ResponseEntity<Map<String, Object>> setOnPage(@PathVariable int senderId, @RequestParam(required = false) Boolean onpage) {
        boolean onpageValue = onpage != null ? onpage : true;
        List<Invitation> invitations = invitationService.getInvitationsBySenderId(senderId);
        for (Invitation invitation : invitations) {
            invitation.setOnpage(onpageValue);
            invitationService.saveInvitation(invitation);
        }
        Map<String, Object> response = new HashMap<>();
        response.put("message", "onpage has been set for invitations with senderId " + senderId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PutMapping("/{invitationId}/onbyid")
    public ResponseEntity<Map<String, Object>> setOnPage3(@PathVariable int invitationId, @RequestParam(required = false) Boolean onpage) {
        boolean onpageValue = onpage != null ? onpage : true;
        Invitation invitation = invitationService.getInvitationById(invitationId).orElseThrow(() -> new NoSuchElementException("Invitation not found"));
        invitation.setOnpage(onpageValue);
        invitationService.saveInvitation(invitation);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "onpage has been set for invitation with ID " + invitationId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PutMapping("/{invitationId}/offbyid")
    public ResponseEntity<Map<String, Object>> setOnPage4(@PathVariable int invitationId, @RequestParam(required = false) Boolean onpage) {
        boolean onpageValue = onpage != null ? onpage : false;
        Invitation invitation = invitationService.getInvitationById(invitationId).orElseThrow(() -> new NoSuchElementException("Invitation not found"));
        invitation.setOnpage(onpageValue);
        invitationService.saveInvitation(invitation);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "onpage has been set for invitation with ID " + invitationId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    //notgood
    @PutMapping("/{senderId}/off")
    public ResponseEntity<Map<String, Object>> setOnPage2(@PathVariable int senderId, @RequestParam(required = false) Boolean onpage) {
        boolean onpageValue = onpage != null ? onpage : false;
        List<Invitation> invitations = invitationService.getInvitationsBySenderId(senderId);
        for (Invitation invitation : invitations) {
            invitation.setOnpage(onpageValue);
            invitationService.saveInvitation(invitation);
        }
        Map<String, Object> response = new HashMap<>();
        response.put("message", "onpage has been set for invitations with senderId " + senderId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    //notgood
    @GetMapping("/invitations/{invitationId}/onpage")
    public ResponseEntity<Map<String, Object>> checkOnPageStatus(@PathVariable int invitationId) {
        Invitation invitation = invitationService.getInvitationById(invitationId).orElseThrow(() -> new NoSuchElementException("Invitation not found"));
        int senderId = invitation.getSenderid();
        boolean onpage = invitationService.getOnPageStatusBySenderId(senderId);
        Map<String, Object> response = new HashMap<>();
        response.put("senderId", senderId);
        response.put("onpage", onpage);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping("/invitations/{invitationId}/onpagebyid")
    public ResponseEntity<Map<String, Object>> checkOnPageStatus2(@PathVariable int invitationId) {
        Invitation invitation = invitationService.getInvitationById(invitationId).orElseThrow(() -> new NoSuchElementException("Invitation not found"));
        boolean onpage = invitation.isOnpage();
        Map<String, Object> response = new HashMap<>();
        response.put("invitationId", invitationId);
        response.put("onpage", onpage);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


}