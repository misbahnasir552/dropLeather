import React, { useEffect, useState } from 'react';

import type { StepType } from '../../interfaces/interface';
import Step from './Step';

const Stepper = ({ ticketStatuses }: any) => {
  const [statusData, setStatusData] = useState<StepType[]>([]);

  const fetchApplicationStatus = async () => {
    try {
      if (ticketStatuses && ticketStatuses.length > 0) {
        const mappedSteps: StepType[] = ticketStatuses.map(
          (
            ticket: { description: string; actionDate: string },
            index: number,
          ) => {
            let mappedDescription = ticket.description;

            // Map ticket.description to a readable format
            if (ticket.description.includes('RM')) {
              mappedDescription = ticket.description.replace(
                'RM',
                'Relationship Manager',
              );
            } else if (ticket.description.includes('CPU')) {
              mappedDescription = ticket.description.replace(
                'CPU',
                'Telenor Bank Team',
              );
            } else if (ticket.description.includes('BET')) {
              mappedDescription = ticket.description.replace(
                'BET',
                'Easypaisa Team',
              );
            } else if (ticket.description.includes('finally approved')) {
              mappedDescription = ticket.description.replace(
                'finally approved',
                'Application processed and closed successfully',
              );
            } else if (ticket.description.includes('Finally Approved.')) {
              mappedDescription = ticket.description.replace(
                'Finally Approved.',
                'Application processed and closed successfully',
              );
            }

            return {
              title: mappedDescription,
              content: `Action Date: ${ticket.actionDate}`,
              status: mappedDescription,
              active: index === ticketStatuses.length - 1,
            };
          },
        );

        setStatusData(mappedSteps);
      } else {
        console.log('HEREEEE SSSS ', statusData);
        setStatusData([]);
      }
    } catch (error) {
      console.error('Error fetching application status:', error);
    }
  };

  useEffect(() => {
    fetchApplicationStatus();
  }, [ticketStatuses]);

  return (
    <>
      <div className="bg-white flex max-w-md flex-col rounded-2xl p-10">
        {statusData.map((step, index) => (
          <Step
            key={index}
            step={step}
            isLast={index === statusData.length - 1}
          />
        ))}
      </div>
    </>
  );
};

export default Stepper;
