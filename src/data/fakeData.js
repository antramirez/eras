// Data to use if user is not logged in
const fakeEvents = [
    {
        _id: 1,
        title: 'Milestone 1',
        date: '2021-03-01',
        dateStr: 'Mar 01, 2021',
        dateObj: new Date('2021-03-01')
    },
    {
        _id: 2,
        title: 'Milestone 2',
        date: '2021-03-20',
        dateStr: 'Mar 20, 2021',
        dateObj: new Date('2021-03-20')
    },
    {
        _id: 3,
        title: 'Milestone 3',
        date: '2021-03-22',
        dateStr: 'Mar 22, 2021',
        dateObj: new Date('2021-03-22')
    },
    {
        _id: 4,
        title: 'Milestone 4',
        date: '2021-03-26',
        dateStr: 'Mar 26, 2021',
        dateObj: new Date('2021-03-26')
    }
];

const fakeTasks = [
    {
        _id: 1,
        goalId: null,
        description: 'Email Professor Erling about letter of rec'
    },
    {
        _id: 2,
        goalId: null,
        description: 'Finish chapter 3 of textbook'
    }
];

const fakeCourses = [
    {
        _id: 1,
        name: 'Family Medicine',
        grade: 4
    },
    {
        _id: 2,
        name: 'Pediatrics',
        grade: 2
    },
    {
        _id: 3,
        name: 'Emergency Medicine',
        grade: 3
    },
    {
        _id: 4,
        name: 'OB-GYN',
        grade: 3
    },
    {
        _id: 5,
        name: 'Internal Medicine',
        grade: 4
    }
];

const fakeExperiences = [
    {
        _id: 1,
        organization: 'Tutoring1',
        type: 'Work',
        position: 'Tutor',
        startDate: 'May 2019',
        endDate: 'August 2019',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.'
    },
    {
        _id: 2,
        organization: 'Volunteering',
        type: 'Volunteering',
        position: 'Tutor',
        startDate: 'May 2019',
        endDate: 'August 2019',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.'
    },
    {
        _id: 3,
        organization: 'Tutoring2',
        type: 'Work',
        position: 'Tutor',
        startDate: 'May 2019',
        endDate: 'August 2019',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.'
    },
    {
        _id: 4,
        organization: 'Tutoring3',
        type: 'Work',
        position: 'Tutor',
        startDate: 'May 2019',
        endDate: 'August 2019',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.'
    }
];

const fakePublications = [
    {
        _id: 1,
        title: 'Polyethylene Glycol Camouflaged Earthworm Hemoglobin',
        link: '#',
        type: 'Paper'
    },
    {
        _id: 2,
        title: 'Abstract',
        link: '#',
        type: 'Abstract'
    },
    {
        _id: 3,
        title: 'Polyethylene Glycol Camouflaged Earthworm Hemoglobin',
        link: '#',
        type: 'Paper'
    },
    {
        _id: 4,
        title: 'Polyethylene Glycol Camouflaged Earthworm Hemoglobin Other',
        link: '#',
        type: 'Other'
    },
    {
        _id: 5,
        title: 'Polyethylene Glycol Camouflaged Earthworm Hemoglobin',
        link: '#',
        type: 'Paper'
    },
    {
        _id: 6,
        title: 'Presentation',
        link: '#',
        type: 'Presentation'
    }
];

export {
    fakeEvents,
    fakeTasks,
    fakeCourses,
    fakeExperiences,
    fakePublications
}