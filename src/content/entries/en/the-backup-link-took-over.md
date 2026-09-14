---
id: journal-glc-inc-0104-opening-en
translationKey: journal-glc-inc-0104-opening
translationStatus: draft
language: en
title: The Backup Link Took Over
date: 2026-09-14
summary: A WAN failover appeared successful in Santiago, but one critical warehouse service never followed the backup path.
topics:
  - Infrastructure Operations
  - Incident Analysis
  - Network Reliability
tags:
  - GLC
  - MPLS
  - IPsec
  - WAN Failover
  - WMS
organizationIds:
  - GLC
incidentIds:
  - GLC-INC-0104
personIds:
  - yessenia
  - laura-santana
relatedEntries: []
draft: true
slug: the-backup-link-took-over
readingTime: 4
---

At 9:10 in the morning, the primary connection between GLC’s Santiago warehouse and the Santo Domingo datacenter stopped working. The branch was designed for that possibility, so the network reacted almost immediately: the primary MPLS path became unavailable and the backup connection took over.

The first signs were encouraging. The IPsec tunnel was active, a representative server in the datacenter was responding again, Active Directory and DNS were reachable, and Internet connectivity from the warehouse was available. Latency was higher than usual, but still within what we expected from the backup path.

From a network perspective, the failover appeared to have worked.

A few minutes later, the NOC reported that connectivity had been restored over the backup circuit. Technically, that statement was correct. Santiago had regained access to the datacenter, and most of the indicators we normally use to confirm connectivity were healthy again.

The problem was that the warehouse still couldn’t work.

At around 9:18, Yessenia, the warehouse supervisor in Santiago, reported that the Warehouse Management System was still timing out. Some operators could continue with information they had already loaded or printed before the interruption, but new picking assignments were not arriving, inventory confirmations could not be completed, and dispatch transactions were not going through.

Her summary was much simpler:

**“The connection came back. The warehouse system did not.”**

That immediately changed the way we had to look at the incident. The network had recovered enough for several technical indicators to turn green, but one of the warehouse’s most important business services was still unavailable.

Laura, from Operations, asked the question that actually mattered: **Could the warehouse dispatch normally or not?**

The answer was no.

So the incident stayed open.

This is where failover scenarios can become deceptive. We tend to describe redundancy in very simple terms: the primary path fails, the backup takes over, and service continues. That model is useful, but it hides an important assumption—that everything the business depends on will actually follow the backup path.

At that point, we did not know why the WMS had remained unavailable. The application itself could have developed a problem, something specific to Santiago might not have recovered correctly, or one of the service’s dependencies might have behaved differently from the rest of the datacenter traffic.

What we did know was that the failure was not behaving like a complete loss of connectivity. The backup link was active, general datacenter access had returned, and yet the warehouse was still unable to reach a system that its operation depended on.

**The backup link had taken over.**

The question now was:

**What hadn’t followed it?**
