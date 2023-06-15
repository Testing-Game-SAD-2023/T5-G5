package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Invitation;

import java.util.List;
import java.util.Optional;

public interface InvitationService {

    public Invitation saveInvitation(Invitation invitation);
    public List<Invitation> getAllInvites();
    public List<Invitation> getByRecipientid(int recipientId);
    public void deleteInvitation(int id);
    public Optional<Invitation> getInvitationById(int id);

    public List<Invitation> getByRecipientidAndAccepted(int recipientid, boolean accepted) ;
    public List<Invitation> getInvitationsBySenderId(int sender_id);
    public boolean getOnPageStatusBySenderId(int senderId);

}