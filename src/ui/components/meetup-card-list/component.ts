import Component, { tracked } from '@glimmer/component';
import EventPresenter from './EventPresenter';
import fetchMeetups from './fetchMeetups'

const meetupUrl = "https://api.meetup.com/2/events?offset=0&format=json&limited_events=False&group_urlname=techcorridorio&page=200&fields=&order=time&desc=false&status=upcoming&sig_id=168857872&sig=e659cc6038d27adf6eae600a44905c69196c77df";

export default class MeetupCardList extends Component {
  @tracked events = [];
  @tracked numOfCardsToShow = 0;

  constructor(options) {
    super(options)
    this.loadMeetups();
  }

  @tracked('events', 'numOfCardsToShow')
  get someEvents() {
    return this.events.slice(0, this.numOfCardsToShow);
  }

  didUpdate() {
    if (this.numOfCardsToShow) {
      // noop
    } else {
      this.numOfCardsToShow = this.element.getAttribute('num-of-cards-to-show') || 5;
    }
  }

  loadMeetups() {
    fetchMeetups(meetupUrl).then((responseData) => {
      this.events = responseData.results.map((rawEventData) => {
        return EventPresenter(rawEventData);
      });
    })
  }
};
