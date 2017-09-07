import Component, { tracked } from '@glimmer/component';
import EventPresenter from './EventPresenter';
import fetchMeetups from './fetchMeetups'

export default class MeetupCardList extends Component {
  numOfCardsToShow = 5;
  @tracked events

  constructor(options) {
    super(options);
    this.loadMeetups();
  }

  loadMeetups() {
    fetchMeetups("https://api.meetup.com/2/events?offset=0&format=json&limited_events=False&group_urlname=techcorridorio&page=200&fields=&order=time&desc=false&status=upcoming&sig_id=168857872&sig=e659cc6038d27adf6eae600a44905c69196c77df").then((responseData) => {
      const someEvents = responseData.results.slice(0, this.numOfCardsToShow);
      const decoratedMeetupEvents = someEvents.map((rawEventData) => {
        return EventPresenter(rawEventData);
      })
      this.events = decoratedMeetupEvents;
    })
  }
};
