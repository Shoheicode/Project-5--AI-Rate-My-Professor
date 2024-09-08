import '../ProfessorBox/boxStyle.css'
import React, { useState } from 'react';
import { User, Mail, Phone, Book, Award, ChevronDown, ChevronUp } from 'lucide-react';

export default function ProfessorBox({ professor }) {
    const [isExpanded, setIsExpanded] = useState(false);
  
    return (
      <div className="professor-box">
        <div className="professor-box-content">
          <div className="professor-image">
            <img 
              src="/api/placeholder/150/150" 
              alt="Professor" 
            />
          </div>
          <div className="professor-info">
            <div className="professor-header">
              <div className="professor-department">
                {professor.department}
              </div>
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="expand-button"
              >
                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>
            <h2 className="professor-name">
              {professor.name}
            </h2>
            <div className="professor-email">
              <Mail size={16} /> {professor.email}
            </div>
            {isExpanded && (
              <div className="professor-details">
                <div className="professor-phone">
                  <Phone size={16} /> {professor.phone}
                </div>
                <div className="professor-courses">
                  <Book size={16} /> {professor.courses.join(', ')}
                </div>
                <div className="professor-achievements">
                  <Award size={16} /> {professor.achievements}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };