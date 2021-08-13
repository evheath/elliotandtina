// docs: https://firebase.google.com/docs/functions/firestore-events
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp(); // only needs to be done once (within any file)
const db = admin.firestore();

export const onRsvpDocumentCreation = functions.firestore.document(`rsvp/{rsvpId}`).onCreate(async (snapshot, context) => {
  const incomingData = snapshot.data();
  const { attending, attendees, name } = incomingData;

  const aggRef = db.doc('aggregations/rsvp');
  const aggDoc = await aggRef.get();
  const aggData = aggDoc.data();
  let attendeeCount = 0;
  let rsvpCount = 0;
  let namesIn: string[] = [];
  let namesOut: string[] = [];
  if (aggData) {
    attendeeCount = aggData.attendeeCount;
    rsvpCount = aggData.rsvpCount;
    namesIn = aggData.namesIn;
    namesOut = aggData.namesOut;
  }

  const next = {
    rsvpCount: rsvpCount + 1,
    attendeeCount,
    namesIn,
    namesOut,
  };

  if (attending) {
    next.attendeeCount = attendeeCount + attendees;
    next.namesIn = [name, ...namesIn];
  } else {
    next.namesOut = [name, ...namesOut];
  }

  return aggRef.set(next);
});
