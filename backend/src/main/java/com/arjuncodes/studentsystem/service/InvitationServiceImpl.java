package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.Invitation;
import com.arjuncodes.studentsystem.repository.InvitationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InvitationServiceImpl implements InvitationService {

    @Autowired
    private InvitationRepository invitationRepository;




    @Override
    public Invitation saveInvitation(Invitation invitation) {





        return invitationRepository.save(invitation);
    }
    @Override
    public List<Invitation> getAllInvites() {
        return invitationRepository.findAll();
    }

    @Override
    public List<Invitation> getByRecipientid(int recipientId) {
        return invitationRepository.findByRecipientid(recipientId);}



    public Optional<Invitation> getInvitationById(int id) {
        return invitationRepository.findById(id);
    }



    public void deleteInvitation(int id) {
        invitationRepository.deleteById(id);
    }


    public List<Invitation> getByRecipientidAndAccepted(int recipientid, boolean accepted) {
        return invitationRepository.findByRecipientidAndAccepted(recipientid, accepted);
    }


    //aggiunta



        public List<Invitation> getInvitationsBySenderId(int senderid) {
            return invitationRepository.findBySenderidOrderByIdDesc(senderid);

    }

    public boolean getOnPageStatusBySenderId(int senderId) {
        List<Invitation> invitations = getInvitationsBySenderId(senderId);
        for (Invitation invitation : invitations) {
            if (invitation.isOnpage()) {
                return true;
            }
        }
        return false;
    }
}