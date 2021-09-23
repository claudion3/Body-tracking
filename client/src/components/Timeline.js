import React from 'react';
import './Timeline.css';
import {
	VerticalTimeline,
	VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Link } from 'react-scroll';

const Timeline = ({ data, removeTruck, editTruck }) => {
	const date = new Date(data.date).toLocaleDateString();

	return (
		<VerticalTimeline data-testid='timeline'>
			<VerticalTimelineElement
				contentStyle={{ background: ' #E9E6EA', color: '#000' }}
				contentArrowStyle={{ borderRight: '7px solid  rgb(233,230,234)' }}
				date={date}
				iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}>
				<h3 className='vertical-timeline-element-title'>Body Truck Data</h3>

				<p className='vertical-timeline-element-subtitle'>
					Weight {data.weight} Kg
				</p>
				<p className='vertical-timeline-element-subtitle'>
					Hip Width {data.hipWidth} cm
				</p>
				<div className='edit-delete'>
					<Link to='edit' smooth={true} duration={1000}>
						<button className='edit' onClick={() => editTruck(data)}>
							<i class='fas fa-edit'></i>
						</button>
					</Link>

					<button className='delete' onClick={() => removeTruck(data._id)}>
						<i className='fas fa-trash'></i>
					</button>
				</div>
			</VerticalTimelineElement>
		</VerticalTimeline>
	);
};

export default Timeline;
