import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';

dayjs.extend(utc);
dayjs.extend(duration);


const useTimer = ({ thisUser, bet }) => {
	const defaultTimer = {
		deadline: bet.deadline,
		bettingUser: bet.user,
		thisUser: thisUser,
		active: false,
		countdown: '',
		btnActive: true,
		btnText: 'Начать ход',
		btnAction: 'start bet',
		getNow: function () { return dayjs.utc(); },
		getActive: function () { return this.deadline !== '' && this.deadline.diff(this.getNow()) > 0; },
		getCountdown: function () {
			if (this.deadline === '') return '';
			return dayjs.duration(this.deadline.diff(this.getNow())).format('HH:mm:ss');
		},
		// if timer isn't active or (timer is active and current user is betting)
		getBtnActive: function () { return !this.getActive() || this.bettingUser === this.thisUser; },
		getBtnText: function () { return !this.getActive() ? 'Начать ход': 'Закончить ход'; },
		getBtnAction: function () {
			// if timer isn't active anyone can start betting
			if (!this.getActive()) return 'start bet';
			// if timer is active only betting user can end betting
			if (this.bettingUser === this.thisUser) return 'end bet';
			// else no action could accur
			return '';
		}
	};

	const updateInputs = () => {
		setTimer(timer => ({
			...timer,
			deadline: bet.deadline,
			bettingUser: bet.user,
			thisUser: thisUser,
		}));
	}

	const updateCalcFields = () => {
		setTimer(timer => ({
			...timer,
			active: timer.getActive(),
			now: timer.getNow(),
			countdown: timer.getCountdown(),
			btnActive: timer.getBtnActive(),
			btnText: timer.getBtnText(),
			btnAction: timer.getBtnAction(),
		}));
	}

	const [timer, setTimer] = useState(defaultTimer);


	// update if inputs change
	useEffect(() => {
		updateInputs();
		updateCalcFields();
	}, [thisUser, bet]);

	// update to alive timer
  useEffect(() => {
    if (timer.getActive()) {
      const interval = setInterval(updateCalcFields, 500);

      return () => clearInterval(interval);
    }
  }, [timer]);

	return timer;
};

export default useTimer;
