-- CreateIndex
CREATE UNIQUE INDEX "Participant_userId_eventId_key" ON "Participant"("userId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_pseudo_eventId_key" ON "Participant"("pseudo", "eventId");
