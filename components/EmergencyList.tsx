import { EmergencyRequest } from '@/types';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils';

interface EmergencyListProps {
  requests: EmergencyRequest[];
  activeRequestId?: string;
  onSelectRequest: (request: EmergencyRequest) => void;
}

export default function EmergencyList({
  requests,
  activeRequestId,
  onSelectRequest
}: EmergencyListProps) {
  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <div
          key={request.id}
          className={cn(
            "p-4 rounded-lg border cursor-pointer transition-colors",
            activeRequestId === request.id
              ? "bg-blue-50 border-blue-200"
              : "hover:bg-gray-50",
            request.priority === 'high' && 'border-red-200'
          )}
          onClick={() => onSelectRequest(request)}
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium">{request.patient.name}</h3>
              <p className="text-sm text-gray-500">
                {request.patient.age} years • {request.patient.gender}
              </p>
            </div>
            <span className="text-sm text-gray-500">
              {formatDate(request.timestamp)}
            </span>
          </div>
          
          <p className={cn(
            "text-sm font-medium mb-2",
            request.priority === 'high' ? 'text-red-600' : 'text-orange-600'
          )}>
            {request.patient.condition}
          </p>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">{request.location}</span>
            <span className={cn(
              "px-2 py-1 rounded-full text-xs",
              {
                'bg-red-100 text-red-700': request.priority === 'high',
                'bg-orange-100 text-orange-700': request.priority === 'medium',
                'bg-green-100 text-green-700': request.priority === 'low',
              }
            )}>
              {request.priority.toUpperCase()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}