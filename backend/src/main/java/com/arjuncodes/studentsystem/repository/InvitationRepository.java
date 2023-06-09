package com.arjuncodes.studentsystem.repository;

import com.arjuncodes.studentsystem.model.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InvitationRepository extends JpaRepository<Invitation,Integer> {
    List<Invitation> findByRecipientid(int recipientId);


    List<Invitation> findByRecipientidAndAccepted(int recipientid, boolean accepted);

    List<Invitation> findBySenderidOrderByIdDesc(int senderid);


}
